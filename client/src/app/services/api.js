import axios from 'axios';

const base_url = process.env.NEXT_PUBLIC_SERVER_URL;



// Get all jobs
export const getJobs = async () => {
  try {
    const response = await axios.get(
      `${base_url}/job/alljobs?page&limit&search&category&subcategory&JobType&WorkMode`
    );

    if (response.data?.success) {
      return response.data.data || [];
    }

    return [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

// Get all subcategories
export const getSubcategories = async () => {
  try {
    const response = await axios.get(
      `${base_url}/job/sub-category`
    );

    if (response.data?.success) {
      return response.data.subcategory || [];
    }

    return [];
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return [];
  }
};

