export const dectector = (req, res) => {
    res.send({
        data: {
            accessApproved: true,
            message: 'Access Granted',
        },
    })
}

export const checkUser = (req, res) => {
    const userInfo = req.userInfo
    res.status(200).send({
        status: 'success',
        payload: userInfo,
    })
}
