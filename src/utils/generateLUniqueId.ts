function generateUniqueID() {
  const uniqueID =
    Date.now().toString(36) + Math.random().toString(36).substr(2);
  return uniqueID;
}

export default generateUniqueID;
