import IPinfoWrapper, { IPinfo, ApiLimitError } from "node-ipinfo";
import { IPINFO_TOKEN } from "../config";

const ipInfoToken = IPINFO_TOKEN || ""; //

console.log(ipInfoToken);
if (!ipInfoToken) {
  console.log("Ip Token is missing");
}

const ipinfoWrapper = new IPinfoWrapper(ipInfoToken);

export const getLocationFromIp = async (ipAddress: string) => {
  const ipv4Address = ipAddress.replace("::ffff:", "");

  try {
    const response: IPinfo = await ipinfoWrapper.lookupIp(ipv4Address);
    return response;
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof ApiLimitError) {
      // Handle API rate limit error
      console.log("API limit reached");
    } else {
      // Handle other errors
      console.log("Other error");
    }
  }
};

// Example usage
