const { Router } = require("express")
const { User, Show }= require("../models/index")

const { check, validationResult } = require("express-validator")

const userRouter = Router()

userRouter.get("/", async (req, res) => {
    const allUsers = await User.findAll()
    res.json(allUsers)
})

userRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    const theUser = await User.findOne({
        where: { id: id }
    })
    res.json(theUser)
})

userRouter.get("/:id/shows", async (req, res) => {
    const id = req.params.id
    const theUser = await User.findOne({
        where: { id: id },
        include: Show
    })
    res.json(theUser.shows)
})

userRouter.put("/:userId/shows/:showId", async (req, res) => {
    const userId = req.params.userId
    const showId = req.params.showId
    const theShow = await Show.findOne({
        where: {id: showId}
    })

    const theUser = await User.findOne({
        where: {id: userId}
    })

    await theUser.addShow(theShow)

    res.send(`Added ${theShow.title} to ${theUser.username}'s watched list.`)
})

module.exports = {
    userRouter
}