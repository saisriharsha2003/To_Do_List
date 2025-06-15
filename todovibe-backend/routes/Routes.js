import express from 'express';
import {  
  add_task,
  view_tasks,
  view_task_by_id,
  edit_task,
  delete_task
} from '../controllers/userController.js';  

const router = express.Router();

router.route('/').get((req, res) => {
    res.send('Welcome to the TodoVibe!');
});

router.route('/add-task').post(add_task);
router.route('/view-tasks').get(view_tasks);
router.route('/task/:taskid').get(view_task_by_id);
router.route('/edit-task/:taskid').put(edit_task);
router.route("/delete-task/:taskid").delete(delete_task);


export default router;  
