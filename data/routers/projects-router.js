const express = require("express");

const Projects = require("../helpers/projectModel");

const router = express.Router();

router.post("/projects", (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({
      errorMessage: "Please provide name."
    });
  }
  if (!description) {
    return res.status(400).json({
      errorMessage: "Please provide description."
    });
  }
  Projects.insert({ name, description })
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the project to the database"
      });
    });
});

router.get("/projects", (req, res) => {
  Projects.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "Projects information could not be retrieved."
      });
    });
});

router.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  Projects.get(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "The project information could not be retrieved."
      });
    });
});

router.get("/projects/actions/:id", (req, res) => {
  const { id } = req.params;
  Projects.getProjectActions(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "The project actions  could not be retrieved."
      });
    });
});

router.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  Projects.remove(id)
    .then(response => {
      res.status(200).json({ response, message: "Deleted!" });
    })
    .catch(error => {
      res.status(500).json({ error: "The project could not be removed" });
    });
});

router.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({
      errorMessage: "Please provide name."
    });
  }
  if (!description) {
    return res.status(400).json({
      errorMessage: "Please provide description."
    });
  }
  Projects.get(id)
    .then(response => {
      if (response.length === 0) {
        return res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      return res
        .status(500)
        .json({ error: "The project could not be retrieved." });
    });
  Projects.update(id, req.body)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(500)
          .json({ error: "The project information could not be modified." });
      }
      res.status(200).json(response);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The projecy information could not be modified." });
    });
});

module.exports = router;
