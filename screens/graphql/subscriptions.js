/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateActivity = `subscription OnCreateActivity {
  onCreateActivity {
    id
    tripid {
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
      activity {
        id
        activityname
        description
        title
        location
        cost
        status
      }
    }
    activityname
    description
    title
    location
    cost
    status
    todos {
      items {
        id
        title
        description
        duedate
        startdate
        status
      }
      nextToken
    }
  }
}
`;
export const onUpdateActivity = `subscription OnUpdateActivity {
  onUpdateActivity {
    id
    tripid {
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
      activity {
        id
        activityname
        description
        title
        location
        cost
        status
      }
    }
    activityname
    description
    title
    location
    cost
    status
    todos {
      items {
        id
        title
        description
        duedate
        startdate
        status
      }
      nextToken
    }
  }
}
`;
export const onDeleteActivity = `subscription OnDeleteActivity {
  onDeleteActivity {
    id
    tripid {
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
      activity {
        id
        activityname
        description
        title
        location
        cost
        status
      }
    }
    activityname
    description
    title
    location
    cost
    status
    todos {
      items {
        id
        title
        description
        duedate
        startdate
        status
      }
      nextToken
    }
  }
}
`;
export const onCreateGroup = `subscription OnCreateGroup {
  onCreateGroup {
    id
    groupname
    groupmembers {
      items {
        id
        username
        phone
        email
        fname
        lname
      }
      nextToken
    }
    trip {
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
      activity {
        id
        activityname
        description
        title
        location
        cost
        status
      }
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
      items {
        id
        username
        phone
        email
        fname
        lname
      }
      nextToken
    }
    trip {
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
      activity {
        id
        activityname
        description
        title
        location
        cost
        status
      }
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
      items {
        id
        username
        phone
        email
        fname
        lname
      }
      nextToken
    }
    trip {
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
      activity {
        id
        activityname
        description
        title
        location
        cost
        status
      }
    }
    image
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
    activity {
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
        nextToken
      }
    }
    owners {
      items {
        id
        username
        phone
        email
        fname
        lname
      }
      nextToken
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
    activity {
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
        nextToken
      }
    }
    owners {
      items {
        id
        username
        phone
        email
        fname
        lname
      }
      nextToken
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
    activity {
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
        nextToken
      }
    }
    owners {
      items {
        id
        username
        phone
        email
        fname
        lname
      }
      nextToken
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
      groupmembers {
        nextToken
      }
      trip {
        id
        tripdestination
        tripstart
        tripend
        thumpbnails
        status
        remarks
      }
      image
    }
    tripdestination
    tripstart
    tripend
    thumpbnails
    status
    remarks
    activity {
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
        nextToken
      }
    }
  }
}
`;
export const onUpdateTrip = `subscription OnUpdateTrip {
  onUpdateTrip {
    id
    groupid {
      id
      groupname
      groupmembers {
        nextToken
      }
      trip {
        id
        tripdestination
        tripstart
        tripend
        thumpbnails
        status
        remarks
      }
      image
    }
    tripdestination
    tripstart
    tripend
    thumpbnails
    status
    remarks
    activity {
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
        nextToken
      }
    }
  }
}
`;
export const onDeleteTrip = `subscription OnDeleteTrip {
  onDeleteTrip {
    id
    groupid {
      id
      groupname
      groupmembers {
        nextToken
      }
      trip {
        id
        tripdestination
        tripstart
        tripend
        thumpbnails
        status
        remarks
      }
      image
    }
    tripdestination
    tripstart
    tripend
    thumpbnails
    status
    remarks
    activity {
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
        nextToken
      }
    }
  }
}
`;
export const onCreateUsers = `subscription OnCreateUsers {
  onCreateUsers {
    id
    username
    groupmembers {
      id
      groupname
      groupmembers {
        nextToken
      }
      trip {
        id
        tripdestination
        tripstart
        tripend
        thumpbnails
        status
        remarks
      }
      image
    }
    todoowner {
      id
      title
      description
      duedate
      startdate
      status
      activity {
        id
        activityname
        description
        title
        location
        cost
        status
      }
      owners {
        nextToken
      }
    }
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
    groupmembers {
      id
      groupname
      groupmembers {
        nextToken
      }
      trip {
        id
        tripdestination
        tripstart
        tripend
        thumpbnails
        status
        remarks
      }
      image
    }
    todoowner {
      id
      title
      description
      duedate
      startdate
      status
      activity {
        id
        activityname
        description
        title
        location
        cost
        status
      }
      owners {
        nextToken
      }
    }
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
    groupmembers {
      id
      groupname
      groupmembers {
        nextToken
      }
      trip {
        id
        tripdestination
        tripstart
        tripend
        thumpbnails
        status
        remarks
      }
      image
    }
    todoowner {
      id
      title
      description
      duedate
      startdate
      status
      activity {
        id
        activityname
        description
        title
        location
        cost
        status
      }
      owners {
        nextToken
      }
    }
    phone
    email
    fname
    lname
  }
}
`;
