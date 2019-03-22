const express = require("express");

const Actions = require("../helpers/actionModel");

const router = express.Router();

router.post("/actions", (req, res) => {
  const { project_id, description, notes } = req.body;
  if (!project_id) {
    return res.status(400).json({
      errorMessage: "Please provide project id."
    });
  }
  if (!description) {
    return res.status(400).json({
      errorMessage: "Please provide description."
    });
  }
  if (!notes) {
    return res.status(400).json({
      errorMessage: "Please provide notes."
    });
  }
  Actions.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the action to the database"
      });
    });
});

router.get("/actions", (req, res) => {
  Actions.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "Actions information could not be retrieved."
      });
    });
});

router.get("/actions/:id", (req, res) => {
  const { id } = req.params;
  Actions.get(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "The action information could not be retrieved."
      });
    });
});

router.delete("/actions/:id", (req, res) => {
  const { id } = req.params;
  Actions.remove(id)
    .then(response => {
      res.status(200).json({ response, message: "Deleted!" });
    })
    .catch(error => {
      res.status(500).json({ error: "The action could not be removed" });
    });
});

router.put("/actions/:id", (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes } = req.body;
  if (!project_id) {
    return res.status(400).json({
      errorMessage: "Please provide project id."
    });
  }
  if (!description) {
    return res.status(400).json({
      errorMessage: "Please provide description."
    });
  }
  if (!notes) {
    return res.status(400).json({
      errorMessage: "Please provide notes."
    });
  }
  Actions.get(id)
    .then(response => {
      if (response.length === 0) {
        return res.status(404).json({
          message: "The action with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      return res
        .status(500)
        .json({ error: "The action could not be retrieved." });
    });
  Actions.update(id, req.body)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(500)
          .json({ error: "The action information could not be modified." });
      }
      res.status(200).json(response);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The action information could not be modified." });
    });
});

module.exports = router;
