const query = `
  query GetPublication($host: String!) {
    publication(host: $host) {
      id
      title
      posts(first: 20) {
        edges {
          node {
            title
            slug
            publishedAt
            brief
            tags {
               name
               slug
            }
            series {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`;

const hosts = [
    "weeklyupdate.hashnode.dev",
    "hackathon-diaries.hashnode.dev",
    "projectlog.hashnode.dev"
];

async function fetchAll() {
    const allPosts = [];
    for (const host of hosts) {
        console.log("Fetching " + host + "...");
        const res = await fetch('https://gql.hashnode.com/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { host } })
        });
        const data = await res.json();
        if (data.data && data.data.publication) {
            console.log("Success for " + host);
            data.data.publication.posts.edges.forEach(e => {
                console.log("  - " + e.node.title);
                if (e.node.series) {
                    console.log("    Series: " + e.node.series.name);
                }
            });
        } else {
            console.log("Error", data.errors);
        }
    }
}

fetchAll();
