const login = (req, res) => {
    const { username, password } = req.body;
    
    // For testing purposes, accept any username/password combination
    // and return a hardcoded token
    return res.json({
        success: true,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoidG9rZW4ifQ.aXh-jeDNyVGWEvDx-ehkyOJHZhZY1UhxW8YNKPqjIhw"
    });
};

module.exports = {
    login
}; 