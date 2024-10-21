const Assignment=require('../../models/Assignments');
const Course= require('../../models/Course')
const createAssignment = async (req, res) => {
    try {
        const { courseID, name, description, dueDate, maxMarks } = req.body;

        // Ensure all required fields are provided
        if (!courseID || !name || !description || !dueDate || !maxMarks) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create a new assignment
        const newAssignment = new Assignment({
            courseID,
            name,
            description,
            dueDate,
            maxMarks,
        });

        // Save the assignment to the database
        const savedAssignment = await newAssignment.save();
        //add the assignment to the courses assignment array
        const course = await Course.findOne({courseID});
        course.assignments.push(savedAssignment._id);
        await course.save();
        // Send a response with the saved assignment
        res.status(201).json(savedAssignment);
    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = createAssignment;
