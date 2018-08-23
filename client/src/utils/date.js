const parseStringToDate = date => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const postDate = new Date(Date.parse(date)).toLocaleString('en-US', options);
  return postDate;
};

export default parseStringToDate;
