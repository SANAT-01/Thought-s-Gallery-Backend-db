// Common response handler

const handleResponse = (res, status, data = null, message = '') => {
    res.status(status).json({ success: status < 400, status, data, message });
};

export default handleResponse;