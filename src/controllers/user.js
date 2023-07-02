
export const dectector = (req,res) => {
    res.send({data:{
        "accessApproved": true,
        "message": "Access Granted"
    }})

}

export const userInfo = (req, res) =>{
    res.send({data: {
        user: req.user
    }})
}