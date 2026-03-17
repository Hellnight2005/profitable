const query = `
  query GetPublication($host: String!) {
    publication(host: $host) {
      id
      title
      posts(first: 5) {
        edges {
          node {
            title
            slug
            publishedAt
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
    for (const host of hosts) {
        console.log("Fetching " + host + "...");
        const res = await fetch('https://gql.hashnode.com/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { host } })
        });
        const data = await res.json();
        console.log(JSON.stringify(data.data.publication || data.errors, null, 2));
        console.log('---');
    }
}

fetchAll();
