/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateActivity = `subscription OnCreateActivity {
  onCreateActivity {
    id
    tripid {
      id
      tripdestination
      tripstart
      tripend
      thumpbnails
      status
      remarks
    }
    activityname
    description
    title
    location
    cost
    status
    todos {
      id
      title
      description
      duedate
      startdate
      status
    }
  }
}
`;
export const onUpdateActivity = `subscription OnUpdateActivity {
  onUpdateActivity {
    id
    tripid {
      id
      tripdestination
      tripstart
      tripend
      thumpbnails
      status
      remarks
    }
    activityname
    description
    title
    location
    cost
    status
    todos {
      id
      title
      description
      duedate
      startdate
      status
    }
  }
}
`;
export const onDeleteActivity = `subscription OnDeleteActivity {
  onDeleteActivity {
    id
    tripid {
      id
      tripdestination
      tripstart
      tripend
      thumpbnails
      status
      remarks
    }
    activityname
    description
    title
    location
    cost
    status
    todos {
      id
      title
      description
      duedate
      startdate
      status
    }
  }
}
`;
export const onCreateTrip = `subscription OnCreateTrip {
  onCreateTrip {
    id
    groupid {
      id
      groupname
      image
    }
    tripdestination
    tripstart
    tripend
    thumpbnails
    status
    remarks
  }
}
`;
export const onUpdateTrip = `subscription OnUpdateTrip {
  onUpdateTrip {
    id
    groupid {
      id
      groupname
      image
    }
    tripdestination
    tripstart
    tripend
    thumpbnails
    status
    remarks
  }
}
`;
export const onDeleteTrip = `subscription OnDeleteTrip {
  onDeleteTrip {
    id
    groupid {
      id
      groupname
      image
    }
    tripdestination
    tripstart
    tripend
    thumpbnails
    status
    remarks
  }
}
`;
export const onCreateGroup = `subscription OnCreateGroup {
  onCreateGroup {
    id
    groupname
    groupmembers {
      id
      username
      phone
      email
      fname
      lname
    }
    groupadmins {
      id
      username
      phone
      email
      fname
      lname
    }
    image
  }
}
`;
export const onUpdateGroup = `subscription OnUpdateGroup {
  onUpdateGroup {
    id
    groupname
    groupmembers {
      id
      username
      phone
      email
      fname
      lname
    }
    groupadmins {
      id
      username
      phone
      email
      fname
      lname
    }
    image
  }
}
`;
export const onDeleteGroup = `subscription OnDeleteGroup {
  onDeleteGroup {
    id
    groupname
    groupmembers {
      id
      username
      phone
      email
      fname
      lname
    }
    groupadmins {
      id
      username
      phone
      email
      fname
      lname
    }
    image
  }
}
`;
export const onCreateUsers = `subscription OnCreateUsers {
  onCreateUsers {
    id
    username
    phone
    email
    fname
    lname
  }
}
`;
export const onUpdateUsers = `subscription OnUpdateUsers {
  onUpdateUsers {
    id
    username
    phone
    email
    fname
    lname
  }
}
`;
export const onDeleteUsers = `subscription OnDeleteUsers {
  onDeleteUsers {
    id
    username
    phone
    email
    fname
    lname
  }
}
`;
export const onCreateToDo = `subscription OnCreateToDo {
  onCreateToDo {
    id
    title
    description
    duedate
    startdate
    status
    owners {
      id
      username
      phone
      email
      fname
      lname
    }
  }
}
`;
export const onUpdateToDo = `subscription OnUpdateToDo {
  onUpdateToDo {
    id
    title
    description
    duedate
    startdate
    status
    owners {
      id
      username
      phone
      email
      fname
      lname
    }
  }
}
`;
export const onDeleteToDo = `subscription OnDeleteToDo {
  onDeleteToDo {
    id
    title
    description
    duedate
    startdate
    status
    owners {
      id
      username
      phone
      email
      fname
      lname
    }
  }
}
`;
