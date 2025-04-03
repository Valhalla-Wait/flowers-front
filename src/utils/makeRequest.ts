export const makeRequest = async (path: string) => {
  try {
    const data = await fetch(`http://localhost:8888/api/${path}`, {
      method: "",
    });
  } catch (error) {}
};
