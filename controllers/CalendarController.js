import Task from "../modules/Task";
import Subjects from "../modules/Subjects";
import { validateData } from "../lib/validation";
import Group from "../modules/Group";
export const createTask = async (req, res) => {
  if (validateData(["title", "date", "subject", "type"], req.body))
    return res.json({ validationError: true });
  const { title, date, subject, type } = req.body;
  const { user, group } = req;
  var curSubject;
  try {
    if (
      subject.title &&
      (subject.index || subject.index === 0) &&
      subject.color
    ) {
      const { title, index, color } = subject;
      const subjectExist = await Subjects.findOne({ title });
      if (subjectExist) {
        await Subjects.updateOne({ title }, { color });
        curSubject = subjectExist;
      } else {
        const newSubj = new Subjects({
          title,
          color,
          group,
        });
        curSubject = await newSubj.save();
      }
    } else {
      return res.json({ validationError: true });
    }
  } catch (err) {
    console.log(error);
  }
  if (date.year && date.month && date.day) {
    const newTask = new Task({
      title,
      index: subject.index,
      date,
      group: group._id,
      subject: curSubject._id,
      createdByUser: user._id,
      type,
      description: req.body.description ?? "",
    });
    await newTask.save();
  } else return res.json({ validationError: true });
  return res.json({ created: true });
};
export const getData = async (req, res) => {
  // returns group.timetable, tasks
  const group = await Group.findOne(
    { _id: req.group._id },
    { calendarData: 1 }
  );
  const tasks = await Task.find({ group: req.group._id }).populate("subject");
  return res.json({ timetable: group.calendarData, tasks });
};
export const deleteTask = async (req, res) => {
  if (!req.query.id) return res.json({ validationError: true });
  await Task.deleteOne({ _id: req.query.id });
  return res.json({ deleted: true });
};
