const throwUnless = (condition, error) => {
  if (!condition) {
    throw error;
  }
};

export default throwUnless;
