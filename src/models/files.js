const fileModel = (createdAt, uid, parent, data, yourName, name, url, path) => {
    const model = {
      createdAt: createdAt,
      createdBy: uid,
      data: data,
      yourName: yourName,
      name: name,
      parent: parent,
      updatedAt: new Date(),
      url: url,
      path: path,
    };
  
    return model;
  };
  
  export default fileModel;
  