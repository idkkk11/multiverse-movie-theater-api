const { Router } = require("express")
const { User, Show }= require("../models/index")

const { check, validationResult } = require("express-validator")

const showRouter = Router()

// REPLACED WITH THE ONE WITH A QUERY
// showRouter.get("/", async (req, res) => {
//     const allShows = await Show.findAll()
//     res.json(allShows)
// })

showRouter.get("/:id", async (req, res) => {
    const theShow = await Show.findOne({
        where: {id: req.params.id}
    })
    res.json(theShow)
})

showRouter.get("/:id/users", async (req, res) => {
    const theShow = await Show.findOne({
        where: {id: req.params.id},
        include: User
    })
    res.json(theShow.users)
})

showRouter.put("/:id/available", async (req, res) => {
    const theShow = await Show.findOne({
        where: {id: req.params.id},
    })
    await Show.update({
        available: !theShow.available
    }, {
        where: {id: req.params.id}
    })
    res.send(`${theShow.title} is now ${!theShow.available}`)
})

showRouter.delete("/:id", async (req, res) => {
    const theShow = await Show.findOne({
        where: {id: req.params.id},
    })
    await Show.delete({
        where: {id: req.params.id}
    })
    res.send(`Deleted ${theShow.title}`)
})

showRouter.get("/", async (req, res) => {
    const genre = req.query.genre
    if (!genre) {
        const allShows = await Show.findAll()
        res.json(allShows)
    }
    else {
        const allShowsByGenre = await Show.findAll({
            where: {genre: genre}
        })
        console.log(allShowsByGenre)
        if (allShowsByGenre.length > 0) {
            res.json(allShowsByGenre)
        }
        else {
            res.send(`No movies under the ${genre} genre.`)
        }
    }
    
})

module.exports = {
    showRouter
}