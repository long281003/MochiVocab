import axios from "axios";
import api from "@/setup/axios";
import { apiMixin } from "@/Mixin/MixinAPI";

export const openAuthModal = async ({commit}) => {
    commit('SET_AUTH_MODAL', true);
}
export const closeAuthModal = async ({commit}) => {
    commit('SET_AUTH_MODAL', false);
}
export const openlModalCourse = async ({commit}) => {
    commit('SET_MODAL', true);
}
export const closeModalCourse = async ({commit}) => {
    commit('SET_MODAL', false);
}
export const registerMember = async ({commit}, member) => {
    const data = await apiMixin.postWithoutAuth('/api/users/register', member)
    if (data) {
        commit('setmember', data.data)
    }
    return data.data
}
export const loginMember = async ({commit}, member) => {
    const data = await apiMixin.postWithoutAuth('/api/users/login', member)
    if (data) {
        const token = data.data.token
        commit('setToken', token)
    }
    return data.data
}
export const fetchMember = async ({commit}) => {
     const data = await apiMixin.getWithAuth('/api/users/account')
    if (data) {
        commit('setmember', data.data)
    }
    return data
}
export const logoutMember = async ({commit}) => {
    try {
        const token = sessionStorage.getItem("authtoken");
        if (token) {
            const res = await axios.post('http://localhost:8080/api/users/logout', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            commit('LOGOUT_MEMBER')
            return res.data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}
export const editPassword = async ({commit}, {oldPassword, newPassword}) => {
     const data = await apiMixin.postWithAuth('/api/users/change_password', {oldPassword, newPassword})
    return data
}
export const SendOtpEmail = async ({commit}, email) => {
    try {
        const res = await api.post('/users/reset', {email})
        commit('setStatus', res.data.data)
        return res.data.data
    } catch (error) {
        console.log(error)
        return error
    }
}
export const fetchCourseList = async ({commit}) => {
    const data = await apiMixin.getWithoutAuth('/api/course/user')
    if (data) {
        commit('setCourse', data.data)
    }
    return data
}
export const fetchTopic = async ({commit}, id) => {
     const data = await apiMixin.getWithoutAuth(`/api/topics/user?id=${id}`)
    if (data) {
        commit('setCourseId', data.data)
    }
    return data
}
export const fetchVocabulary = async ({ commit }, id) => {
     const data = await apiMixin.getWithAuth(`/api/vocabs/user?id=${id}`)
    if (data) {
        commit('setVocab', data.data)
    }
    return data
}
export const fetchTotalRevenue = async ({ commit },) => {
    const data = await apiMixin.getWithAuth(`/api/statistical/revenue`)
    if (data) {
        commit('setRevenue', data.data)
    }
    return data
}
export const fetchTotalUser = async ({ commit },) => {
    const data = await apiMixin.getWithAuth(`/api/statistical/active_count`)
    if (data) {
        commit('setTotalUser', data.data)
    }
    return data
}
export const fetchTotalVip = async ({ commit },) => {
    const data = await apiMixin.getWithAuth(`/api/statistical/vip`)
    if (data) {
        commit('setTotalVip', data.data)
    }
    return data
}
export const fetchTotalCourse = async ({ commit }) => {
     const data = await apiMixin.getWithAuth(`/api/statistical/course`)
    if (data) {
        commit('setTotalCourse', data.data)
    }
    return data
}
export const fetchTotalVocab = async ({ commit }) => {
      const data = await apiMixin.getWithAuth(`/api/statistical/count_vocab`)
    if (data) {
        commit('setTotalVocab', data.data)
    }
    return data
}
export const fetchSegement = async ({ commit }) => {
       const data = await apiMixin.getWithAuth(`/api/statistical/segments`)
    if (data) {
        commit('setSegments', data.data)
    }
    return data
}
export const fetchMonth = async ({ commit }) => {
       const data = await apiMixin.getWithAuth(`/api/statistical/sub`)
    if (data) {
        commit('setMonth', data.data)
    }
    return data
}
export const fetchListUser = async ({ commit }, {page, size}) => {
     const data = await apiMixin.getWithAuth(`/api/users/page?page=${page}&size=${size}`)
    if (data) {
        commit('setListUser', data.data.content)
    }
    return data
}
export const addUser = async ({ commit }, body) => {
    const data = await apiMixin.postWithAuth(`/api/users`, body)
    if (data) {
        commit('addUsers', data.data)
    }
    return data
}
export const deleteUser = async ({ commit }, userId) => {
     const data = await apiMixin.deleWithAuth(`/api/users/${userId}`)
    if (data) {
        commit('removeUser', data.data)
    }
    return data
};
export const updateUser = async ({ commit }, {id, body}) => {
    try {
        const token = sessionStorage.getItem('authtoken');
        if (token) {
            const res = await axios.put(`http://localhost:8080/api/users/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            commit('UPDATE_USER', res.data)
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}
export const fetchAllCourse = async ({ commit }) => {
    const data = await apiMixin.getWithAuth(`/api/course`)
    if (data) {
        commit('setAllCourse', data.data)
    }
    return data
}
export const fetchListCourse = async ({ commit }, {page, size, courseName, description, courseTarget}) => {
    const data = await apiMixin.getWithAuth(`/api/course/page?page=${page}&size=${size}`, {
        params: {
            courseName: courseName || '',
            description: description || '',
            courseTarget: courseTarget || ''
         }
     })
    if (data) {
        commit('setLisetCourse', data.data.content)
    }
    return data
}
export const addCourse = async ({ commit }, body) => {
    const data = await apiMixin.postWithAuth(`/api/course`, body)
    if (data) {
        commit('addCourses', data.data)
    }
    return data
}
export const deleteCourse = async ({ commit }, id) => {
     const data = await apiMixin.deleWithAuth(`/api/course/${id}`)
    if (data) {
        commit('removeCourse', data.data)
    }
    return data
};
export const updateCourse = async ({ commit }, {id, body}) => {
     const data = await apiMixin.putWithAuth(`/api/course/${id}`, body)
    if (data) {
        commit('UPDATE_COURSE', data.data)
    }
    return data
}
export const fetchListTopic = async ({ commit }, {page, size}) => {
     const data = await apiMixin.getWithAuth(`/api/topics/page?page=${page}&size=${size}`)
    if (data) {
        commit('setListTopic', data.data.content)
    }
    return data
}
export const fetchAllTopic = async ({ commit }) => {
    const data = await apiMixin.getWithAuth(`/api/topics`)
    if (data) {
        commit('setallTopic', data.data)
    }
    return data
}
export const addTopic = async ({ commit }, body) => {
    const data = await apiMixin.postWithAuth(`/api/topics`, body)
    if (data) {
        commit('addTopics', data.data)
    }
    return data
}
export const uploadImg = async ({ commit }, { id, formData }) => {
    try {
      const response = await axios.post(`/api/topics/imag/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      return response;
    } catch (error) {
        console.log(error)
      throw error;
    }
}
export const deleteTopic = async ({ commit }, id) => {
     const data = await apiMixin.deleWithAuth(`/api/topics/${id}`)
    if (data) {
        commit('removeTopic', data.data)
    }
    return data
};
export const updateTopic = async ({ commit }, {id, body}) => {
     const data = await apiMixin.putWithAuth(`/api/course/${id}`, body)
    if (data) {
        commit('UPDATE_TOPIC', data.data)
    }
    return data
}
export const fetchListVocab = async ({ commit }, {page, size}) => {
    const data = await apiMixin.getWithAuth(`/api/vocabs/page?page=${page}&size=${size}`)
    if (data) {
        commit('setListVocab', data.data.content)
    }
    return data
}
export const fetchAllVocab = async ({ commit }) => {
    const data = await apiMixin.getWithAuth(`/api/vocabs`)
    if (data) {
        commit('setallVocab', data.data)
    }
    return data
}
export const addVocab = async ({ commit }, body) => {
    const data = await apiMixin.postWithAuth(`/api/vocabs`, body)
    if (data) {
        commit('addVocabs', data.data)
    }
    return data
}
export const deleteVocab = async ({ commit }, id) => {
     const data = await apiMixin.deleWithAuth(`/api/vocabs/${id}`)
    if (data) {
        commit('removeVocab', data.data)
    }
    return data
};
export const updateVocab = async ({ commit }, {id, body}) => {
     const data = await apiMixin.putWithAuth(`/api/vocabs/${id}`, body)
    if (data) {
        commit('UPDATE_Vocab', data.data)
    }
    return data
}
export const fetchVocabLearn = async ({ commit }, id) => {
    const data = await apiMixin.getWithAuth(`/api/vocabs/user?id=${id}`)
    if (data) {
        commit('SET_VOCAB_LEARN', data.data)
    }
    return data
}
export const fetchVocabLever = async ({ commit }, {keyWord, level}) => {
     try {
        const token = sessionStorage.getItem('authtoken')
        if(token) {
             const res = await axios.get(`http://localhost:8080/api/users/wordbook?search=${keyWord}&level=${level}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
             })
        commit('SET_VOCAB_LEVER', res.data.data)
        return res.data
        }
    } catch (error) {
        console.log(error)
        return error.response
    }
    // const data = await apiMixin.getWithAuth(`/api/users/wordbook?search=${keyWord}&level=${lever}`)
    // if (data) {
    //     commit('SET_VOCAB_LEVER', data.data.data)
    // }
    // return data
}
export const makePayment = async ({ commit }, {amount}) => {
    const data = await apiMixin.getWithAuth(`/api/payment/pay?amount=${amount}`)
    return data.data
}
export const fetchChartData = async ({ commit }) => {
    const data = await apiMixin.getWithAuth(`/api/users/review_stats`)
    if (data) {
        commit('SET_CHART_DATA', data)
    }
    return data
}
export const fetchSaveVocab = async ({ commit }, id) => {
    const data = await apiMixin.postWithAuth(`/api/users/selected_vocab?id=${id}`, )
    if (data) {
        commit('SET_SELECTED_VOCAB', data)
        console.log(data.data)
    }
    return data.data
}
export const deleteWorlBook = async ({ commit }, id) => {
     const data = await apiMixin.deleWithAuth(`api/users/wordbook/${id}`)
    if (data) {
        commit('removeWorkBook', data.data)
    }
    return data
};