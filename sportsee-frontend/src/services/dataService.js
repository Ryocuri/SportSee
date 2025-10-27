import axios from 'axios'
import {
    USER_MAIN_DATA,
    USER_ACTIVITY,
    USER_AVERAGE_SESSIONS,
    USER_PERFORMANCE
} from '../data/mockedData'

/**
 * Configuration for API
 */
const API_BASE_URL = 'http://localhost:3000'
const USE_MOCKED_DATA = true // Toggle between mocked and real API data

/**
 * Standardizes user main data to ensure consistent structure
 * Handles both 'score' and 'todayScore' properties
 * @param {Object} data - Raw user data from API
 * @returns {Object} Standardized user data
 */
function standardizeUserData(data) {
    return {
        id: data.id,
        userInfos: {
            firstName: data.userInfos.firstName,
            lastName: data.userInfos.lastName,
            age: data.userInfos.age
        },
        todayScore: data.todayScore !== undefined ? data.todayScore : data.score,
        keyData: {
            calorieCount: data.keyData.calorieCount,
            proteinCount: data.keyData.proteinCount,
            carbohydrateCount: data.keyData.carbohydrateCount,
            lipidCount: data.keyData.lipidCount
        }
    }
}

/**
 * Standardizes activity data
 * @param {Object} data - Raw activity data from API
 * @returns {Object} Standardized activity data
 */
function standardizeActivityData(data) {
    return {
        userId: data.userId,
        sessions: data.sessions.map((session, index) => ({
            day: index + 1,
            kilogram: session.kilogram,
            calories: session.calories
        }))
    }
}

/**
 * Standardizes average sessions data
 * @param {Object} data - Raw average sessions data from API
 * @returns {Object} Standardized average sessions data
 */
function standardizeAverageSessionsData(data) {
    return {
        userId: data.userId,
        sessions: data.sessions.map(session => ({
            day: session.day,
            sessionLength: session.sessionLength
        }))
    }
}

/**
 * Standardizes performance data
 * @param {Object} data - Raw performance data from API
 * @returns {Object} Standardized performance data with translated kinds
 */
function standardizePerformanceData(data) {
    const kindTranslations = {
        cardio: 'Cardio',
        energy: 'Energie',
        endurance: 'Endurance',
        strength: 'Force',
        speed: 'Vitesse',
        intensity: 'Intensité'
    }

    return {
        userId: data.userId,
        data: data.data.map(item => ({
            value: item.value,
            kind: kindTranslations[data.kind[item.kind]] || data.kind[item.kind]
        }))
    }
}

/**
 * Fetches user main information
 * @param {number} userId - User ID
 * @returns {Promise<Object>} Standardized user data
 */
export async function getUserData(userId) {
    try {
        if (USE_MOCKED_DATA) {
            const userData = USER_MAIN_DATA.find(user => user.id === userId)
            if (!userData) {
                throw new Error(`User ${userId} not found`)
            }
            return standardizeUserData(userData)
        }

        const response = await axios.get(`${API_BASE_URL}/user/${userId}`)
        return standardizeUserData(response.data.data)
    } catch (error) {
        console.error('Error fetching user data:', error)
        throw error
    }
}

/**
 * Fetches user activity data
 * @param {number} userId - User ID
 * @returns {Promise<Object>} Standardized activity data
 */
export async function getUserActivity(userId) {
    try {
        if (USE_MOCKED_DATA) {
            const activityData = USER_ACTIVITY.find(activity => activity.userId === userId)
            if (!activityData) {
                throw new Error(`Activity data for user ${userId} not found`)
            }
            return standardizeActivityData(activityData)
        }

        const response = await axios.get(`${API_BASE_URL}/user/${userId}/activity`)
        return standardizeActivityData(response.data.data)
    } catch (error) {
        console.error('Error fetching user activity:', error)
        throw error
    }
}

/**
 * Fetches user average sessions data
 * @param {number} userId - User ID
 * @returns {Promise<Object>} Standardized average sessions data
 */
export async function getUserAverageSessions(userId) {
    try {
        if (USE_MOCKED_DATA) {
            const sessionsData = USER_AVERAGE_SESSIONS.find(sessions => sessions.userId === userId)
            if (!sessionsData) {
                throw new Error(`Average sessions data for user ${userId} not found`)
            }
            return standardizeAverageSessionsData(sessionsData)
        }

        const response = await axios.get(`${API_BASE_URL}/user/${userId}/average-sessions`)
        return standardizeAverageSessionsData(response.data.data)
    } catch (error) {
        console.error('Error fetching user average sessions:', error)
        throw error
    }
}

/**
 * Fetches user performance data
 * @param {number} userId - User ID
 * @returns {Promise<Object>} Standardized performance data
 */
export async function getUserPerformance(userId) {
    try {
        if (USE_MOCKED_DATA) {
            const performanceData = USER_PERFORMANCE.find(perf => perf.userId === userId)
            if (!performanceData) {
                throw new Error(`Performance data for user ${userId} not found`)
            }
            return standardizePerformanceData(performanceData)
        }

        const response = await axios.get(`${API_BASE_URL}/user/${userId}/performance`)
        return standardizePerformanceData(response.data.data)
    } catch (error) {
        console.error('Error fetching user performance:', error)
        throw error
    }
}

/**
 * Fetches all user data at once
 * @param {number} userId - User ID
 * @returns {Promise<Object>} Object containing all user data
 */
export async function getAllUserData(userId) {
    try {
        const [userData, activity, averageSessions, performance] = await Promise.all([
            getUserData(userId),
            getUserActivity(userId),
            getUserAverageSessions(userId),
            getUserPerformance(userId)
        ])

        return {
            userData,
            activity,
            averageSessions,
            performance
        }
    } catch (error) {
        console.error('Error fetching all user data:', error)
        throw error
    }
}