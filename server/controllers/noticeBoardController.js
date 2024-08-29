const db = require('../connectDB');

// Get news by kindergarten ID
const getNewsByKindergartenId = async (req, res) => {
    const { kindergarten_id } = req.params;
    try {
        const news = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM notice_board WHERE kindergarten_id = ?', [kindergarten_id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json(news);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching news by kindergarten ID', error: err });
    }
};

const postNews = async (req, res) => {
    const { title, content, kindergarten_id } = req.body;
    try {
        await new Promise((resolve, reject) => {
            const query = 'INSERT INTO notice_board (title, content, kindergarten_id, date_posted) VALUES (?, ?, ?, NOW())';
            db.query(query, [title, content, kindergarten_id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(201).json({ message: 'News added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding news', error: err });
    }
};
const editNews = async (req, res) => {
    const { newsId } = req.params;
    const { title, content } = req.body;
    try {
        await new Promise((resolve, reject) => {
            const query = 'UPDATE notice_board SET title = ?, content = ? WHERE id = ?';
            db.query(query, [title, content, newsId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json({ message: 'News updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating news', error: err });
    }
};

// Delete news
const deleteNews = async (req, res) => {
    const { newsId } = req.params;
    try {
        await new Promise((resolve, reject) => {
            const query = 'DELETE FROM notice_board WHERE id = ?';
            db.query(query, [newsId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json({ message: 'News deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting news', error: err });
    }
};

module.exports = {
    getNewsByKindergartenId,
    postNews,
    editNews,
    deleteNews
};
