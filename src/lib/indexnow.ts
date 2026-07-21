export interface IndexNowOptions {
  urls: string[];
  host?: string;
  key?: string;
  keyLocation?: string;
}

export interface IndexNowResponse {
  success: boolean;
  status: number;
  message: string;
  submittedUrls: string[];
}

const INDEXNOW_API_ENDPOINT = 'https://api.indexnow.org/IndexNow';
const DEFAULT_KEY = process.env.INDEXNOW_KEY || '8b016aaef66f439898e5fc7f404f7285';
const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://profitable-azure.vercel.app';

/**
 * Submits a list of URLs to Bing / IndexNow protocol.
 */
export async function submitToIndexNow(options: IndexNowOptions): Promise<IndexNowResponse> {
  const { urls } = options;

  if (!urls || urls.length === 0) {
    return {
      success: false,
      status: 400,
      message: 'No URLs provided for IndexNow submission.',
      submittedUrls: [],
    };
  }

  const siteUrlString = options.host
    ? options.host.startsWith('http') ? options.host : `https://${options.host}`
    : DEFAULT_SITE_URL;
  
  const siteUrl = new URL(siteUrlString);
  const hostName = siteUrl.hostname;
  const key = options.key || DEFAULT_KEY;
  const keyLocation = options.keyLocation || `${siteUrl.origin}/${key}.txt`;

  const payload = {
    host: hostName,
    key: key,
    keyLocation: keyLocation,
    urlList: urls,
  };

  try {
    const res = await fetch(INDEXNOW_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const status = res.status;
    let message = '';

    switch (status) {
      case 200:
      case 202:
        message = 'URLs submitted successfully to IndexNow.';
        break;
      case 400:
        message = 'Bad Request: Invalid format in IndexNow payload.';
        break;
      case 403:
        message = 'Forbidden: Key not valid or key location mismatch.';
        break;
      case 422:
        message = "Unprocessable Entity: URLs don't belong to host or key schema invalid.";
        break;
      case 429:
        message = 'Too Many Requests: Rate limit exceeded.';
        break;
      default:
        message = `IndexNow responded with status code ${status}`;
    }

    return {
      success: status === 200 || status === 202,
      status,
      message,
      submittedUrls: urls,
    };
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      status: 500,
      message: `Failed to connect to IndexNow API: ${errMessage}`,
      submittedUrls: urls,
    };
  }
}
