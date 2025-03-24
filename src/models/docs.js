const docModel = (uid, name, formattedDueDate, path, parent) => {
    const model = {
      createdAt: new Date(),
      createdBy: uid,
      lastAccessed: new Date(),
      name: name,
      formattedDueDate: formattedDueDate,
      updatedAt: new Date(),
      path: path,
      parent: parent,
    };
  
    return model;
  };
  
  export default docModel;
  