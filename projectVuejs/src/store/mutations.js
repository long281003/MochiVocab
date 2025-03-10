export const SET_AUTH_MODAL = (state, paload) => {
    state.showAuthModal = paload;
}
export const SET_MODAL = (state, paload) => {
    state.showModalCourse = paload;
}
export const setmember = (state, member) => {
    state.members = member || {}
}
export const LOGOUT_MEMBER = (state) => {
    state.user = null
}
export const setToken = (state, token) => {
    state.token = token
    sessionStorage.setItem('authtoken', token)
}
export const setCourse = (state, course) => {
    state.courseLists = course || []
}
export const setTopic = (state, topic) => {
    state.topic = topic
}
export const setStatus = (state, otp) => {
    state.otpstatus = otp
}
export const setCourseId = (state, course) => {
    state.courseId = course
}
export const setVocab = (state, vocabulary) => {
    state.vocabularys = vocabulary
}
export const setRevenue = (state, revenue) => {
    state.totalRevenue = revenue
}
export const setTotalUser = (state, totalUser) => {
    state.totalUsers = totalUser
}
export const setTotalVip = (state, totalVip) => {
    state.totalVips = totalVip
}
export const setTotalCourse = (state, totalCourse) => {
    state.totalCourses = totalCourse
}
export const setTotalVocab = (state, totalVocab) => {
    state.totalVocabs = totalVocab
}
export const setSegments = (state, segment) => {
    state.segments = segment
}
export const setMonth = (state, month) => {
    state.months = month
}
export const setListUser = (state, user) => {
    state.listUsers = user
}
export const addUsers = (state, user) => {
    state.users = user
}
export const removeUser = (state, userId) => {
  state.listUsers = state.listUsers.filter((user) => user.id !== userId);
};
export const UPDATE_USER = (state, updatedUser) => {
    state.users = updatedUser
};
export const setAllCourse = (state, course) => {
    state.allCourse = course
}
export const setLisetCourse = (state, course) => {
    state.listCourses = course
}
export const addCourses = (state, course) => {
    state.courses = course
}
export const removeCourse = (state, id) => {
  state.listCourses = state.listCourses.filter((course) => course.id !== id);
};
export const UPDATE_COURSE = (state, updatedCourse) => {
   state.courses = updatedCourse
};
export const setallTopic = (state, topic) => {
    state.allTopics = topic
}
export const setListTopic = (state, topic) => {
    state.listTopic = topic
}
export const addTopics = (state, topic) => {
    state.topics = topic
}
export const removeTopic = (state, id) => {
  state.listTopic = state.listTopic.filter((topic) => topic.id !== id);
};
export const UPDATE_TOPIC = (state, updatedTopic) => {
   state.topics = updatedTopic
};
export const setListVocab = (state, vocab) => {
    state.listVocab = vocab
}
export const addVocabs = (state, vocab) => {
    state.vovcabs = vocab
}
export const setallVocab = (state, vocab) => {
    state.allVocabs = vocab
}
export const removeVocab = (state, id) => {
  state.listVocab = state.listVocab.filter((topic) => topic.id !== id);
};
export const UPDATE_Vocab = (state, updatedVocab) => {
   state.vovcabs = updatedVocab
};
export const SET_VOCAB_LEARN = (state, vocabLearn) => {
   state.voCabLearns = vocabLearn
};
export const SET_VOCAB_LEVER = (state, vocabLever) => {
   state.vocabLever = vocabLever
};
export const SET_CHART_DATA = (state, chartData) => {
   state.chartData = chartData
};
export const SET_SELECTED_VOCAB = (state, vocab) => {
   state.selectedVocab = vocab
};
export const removeWorkBook = (state, id) => {
  state.workBook = state.workBook.filter((vocab) => vocab.id !== id);
};