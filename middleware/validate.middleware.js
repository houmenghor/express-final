const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (result.error) {
        const allErrors = result.error.flatten().fieldErrors;
        const cleanErrors = {};
        for (const key in allErrors) {
            cleanErrors[key] = allErrors[key][0];
        }
        return res.status(422).json({
            status: 'error',
            message: 'Validation failed',
            errors: cleanErrors
        });
    }
    req.validate = result.data;
    next();
};

module.exports = validate;