/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateActivity = `subscription OnCreateActivity {
  onCreateActivity {
    activityname
    cost
    description
    id
    location
    status
    title
    todos {
      items {
        description
        duedate
        id
        startdate
        status
        title
      }
      nextToken
    }
    tripid {
      activity {
        activityname
        cost
        description
        id
        location
        status
        title
      }
      groupid {
        groupname
        id
        image
      }
      id
      remarks
      status
      thumpbnails
      tripdestination
      tripend
      tripstart
    }
  }
}
`;
export const onCreateGroup = `subscription OnCreateGroup {
  onCreateGroup {
    groupmembers {
      email
      fname
      groupmembers {
        groupname
        id
        image
      }
      id
      lname
      phone
      todoowner {
        description
        duedate
        id
        startdate
        status
        title
      }
      username
    }
    groupname
    id
    image
    trip {
      activity {
        activityname
        cost
        description
        id
        location
        status
        title
      }
      groupid {
        groupname
        id
        image
      }
      id
      remarks
      status
      thumpbnails
      tripdestination
      tripend
      tripstart
    }
  }
}
`;
export const onCreateToDo = `subscription OnCreateToDo {
  onCreateToDo {
    activity {
      activityname
      cost
      description
      id
      location
      status
      title
      todos {
        nextToken
      }
      tripid {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    description
    duedate
    id
    owners {
      items {
        email
        fname
        id
        lname
        phone
        username
      }
      nextToken
    }
    startdate
    status
    title
  }
}
`;
export const onCreateTrip = `subscription OnCreateTrip {
  onCreateTrip {
    activity {
      activityname
      cost
      description
      id
      location
      status
      title
      todos {
        nextToken
      }
      tripid {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    groupid {
      groupmembers {
        email
        fname
        id
        lname
        phone
        username
      }
      groupname
      id
      image
      trip {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    id
    remarks
    status
    thumpbnails
    tripdestination
    tripend
    tripstart
  }
}
`;
export const onCreateUsers = `subscription OnCreateUsers {
  onCreateUsers {
    email
    fname
    groupmembers {
      groupmembers {
        email
        fname
        id
        lname
        phone
        username
      }
      groupname
      id
      image
      trip {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    id
    lname
    phone
    todoowner {
      activity {
        activityname
        cost
        description
        id
        location
        status
        title
      }
      description
      duedate
      id
      owners {
        nextToken
      }
      startdate
      status
      title
    }
    username
  }
}
`;
export const onDeleteActivity = `subscription OnDeleteActivity {
  onDeleteActivity {
    activityname
    cost
    description
    id
    location
    status
    title
    todos {
      items {
        description
        duedate
        id
        startdate
        status
        title
      }
      nextToken
    }
    tripid {
      activity {
        activityname
        cost
        description
        id
        location
        status
        title
      }
      groupid {
        groupname
        id
        image
      }
      id
      remarks
      status
      thumpbnails
      tripdestination
      tripend
      tripstart
    }
  }
}
`;
export const onDeleteGroup = `subscription OnDeleteGroup {
  onDeleteGroup {
    groupmembers {
      email
      fname
      groupmembers {
        groupname
        id
        image
      }
      id
      lname
      phone
      todoowner {
        description
        duedate
        id
        startdate
        status
        title
      }
      username
    }
    groupname
    id
    image
    trip {
      activity {
        activityname
        cost
        description
        id
        location
        status
        title
      }
      groupid {
        groupname
        id
        image
      }
      id
      remarks
      status
      thumpbnails
      tripdestination
      tripend
      tripstart
    }
  }
}
`;
export const onDeleteToDo = `subscription OnDeleteToDo {
  onDeleteToDo {
    activity {
      activityname
      cost
      description
      id
      location
      status
      title
      todos {
        nextToken
      }
      tripid {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    description
    duedate
    id
    owners {
      items {
        email
        fname
        id
        lname
        phone
        username
      }
      nextToken
    }
    startdate
    status
    title
  }
}
`;
export const onDeleteTrip = `subscription OnDeleteTrip {
  onDeleteTrip {
    activity {
      activityname
      cost
      description
      id
      location
      status
      title
      todos {
        nextToken
      }
      tripid {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    groupid {
      groupmembers {
        email
        fname
        id
        lname
        phone
        username
      }
      groupname
      id
      image
      trip {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    id
    remarks
    status
    thumpbnails
    tripdestination
    tripend
    tripstart
  }
}
`;
export const onDeleteUsers = `subscription OnDeleteUsers {
  onDeleteUsers {
    email
    fname
    groupmembers {
      groupmembers {
        email
        fname
        id
        lname
        phone
        username
      }
      groupname
      id
      image
      trip {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    id
    lname
    phone
    todoowner {
      activity {
        activityname
        cost
        description
        id
        location
        status
        title
      }
      description
      duedate
      id
      owners {
        nextToken
      }
      startdate
      status
      title
    }
    username
  }
}
`;
export const onUpdateActivity = `subscription OnUpdateActivity {
  onUpdateActivity {
    activityname
    cost
    description
    id
    location
    status
    title
    todos {
      items {
        description
        duedate
        id
        startdate
        status
        title
      }
      nextToken
    }
    tripid {
      activity {
        activityname
        cost
        description
        id
        location
        status
        title
      }
      groupid {
        groupname
        id
        image
      }
      id
      remarks
      status
      thumpbnails
      tripdestination
      tripend
      tripstart
    }
  }
}
`;
export const onUpdateGroup = `subscription OnUpdateGroup {
  onUpdateGroup {
    groupmembers {
      email
      fname
      groupmembers {
        groupname
        id
        image
      }
      id
      lname
      phone
      todoowner {
        description
        duedate
        id
        startdate
        status
        title
      }
      username
    }
    groupname
    id
    image
    trip {
      activity {
        activityname
        cost
        description
        id
        location
        status
        title
      }
      groupid {
        groupname
        id
        image
      }
      id
      remarks
      status
      thumpbnails
      tripdestination
      tripend
      tripstart
    }
  }
}
`;
export const onUpdateToDo = `subscription OnUpdateToDo {
  onUpdateToDo {
    activity {
      activityname
      cost
      description
      id
      location
      status
      title
      todos {
        nextToken
      }
      tripid {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    description
    duedate
    id
    owners {
      items {
        email
        fname
        id
        lname
        phone
        username
      }
      nextToken
    }
    startdate
    status
    title
  }
}
`;
export const onUpdateTrip = `subscription OnUpdateTrip {
  onUpdateTrip {
    activity {
      activityname
      cost
      description
      id
      location
      status
      title
      todos {
        nextToken
      }
      tripid {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    groupid {
      groupmembers {
        email
        fname
        id
        lname
        phone
        username
      }
      groupname
      id
      image
      trip {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    id
    remarks
    status
    thumpbnails
    tripdestination
    tripend
    tripstart
  }
}
`;
export const onUpdateUsers = `subscription OnUpdateUsers {
  onUpdateUsers {
    email
    fname
    groupmembers {
      groupmembers {
        email
        fname
        id
        lname
        phone
        username
      }
      groupname
      id
      image
      trip {
        id
        remarks
        status
        thumpbnails
        tripdestination
        tripend
        tripstart
      }
    }
    id
    lname
    phone
    todoowner {
      activity {
        activityname
        cost
        description
        id
        location
        status
        title
      }
      description
      duedate
      id
      owners {
        nextToken
      }
      startdate
      status
      title
    }
    username
  }
}
`;
