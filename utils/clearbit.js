const autocompleteExpenditure = async (query) => {
  try {
    const response = await fetch(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Clearbit data:", error);
    return [];
  }
};

export { autocompleteExpenditure };
