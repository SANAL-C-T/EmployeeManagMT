const Data_validation = (schema) => async (req, res, next) => {
    try {
        console.log("Incoming data for validation at server:", req.body);
        schema.validateSync(req.body, { abortEarly: false });

        next();
    } catch (error) {
        console.error("Validation error:", error);
        res.status(400).json({ errors: error.errors });
    }
};

module.exports = Data_validation;
