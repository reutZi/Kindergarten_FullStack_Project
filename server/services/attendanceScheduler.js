const cron = require('node-cron');
const { sendSMS } = require('./smsService');
const { getChildrenByKindergartenId } = require('../controllers/childrenController');
const { getParentPhoneNumberByID } = require('../controllers/parentController');
const { getChildAttendanceByDate } = require('..controllers/attendanceController');



// Notify the parent if the child is not in class
async function checkAttendanceAndNotify(child) {
    const today = new Date().toISOString().split('T')[0];
    const isInClass = await getChildAttendanceByDate(child.id, today);
    if (!isInClass) {
        const parentPhoneNumber = await getParentPhoneNumberByID(child.id);
        if (parentPhoneNumber) {
            await sendSMS(parentPhoneNumber, `שלום, ${child.first_name} לא הגיע עדין היום לגן, אנא צרו קשר עם הגננת`);
        } else {
            console.error('Parent phone number not found for child ID:', child.id);
        }

    }
}


function startAttendanceScheduler(kindergartenId) {
    //scheduale the task to run every 10 minutes from 9:00AM to 10:00AM
    cron.schedule('*/10 9 * * *', async () => {
        try {
            const children = await getChildrenByKindergartenId(kindergartenId);
            for (const child of children) {
                    await checkAttendanceAndNotify(child);

            }
        } catch (error) {
            console.error('Error checking attendance or sending SMS:', error);
        }
    });

    console.log(`Attendance scheduler started for kindergarten ${kindergartenId}.`);
}

module.exports = { startAttendanceScheduler };
