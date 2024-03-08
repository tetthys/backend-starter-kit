const throwIf = (condition, error) => {
  if (condition) {
    throw error;
  }
};

export default throwIf;
