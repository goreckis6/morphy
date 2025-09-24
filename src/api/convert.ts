import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/convert', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const { quality = 'high', lossless = 'false' } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const qualityValue = quality === 'high' ? 95 : quality === 'medium' ? 80 : 60;
    const losslessFlag = lossless === 'true';

    // Save file to temp location for libraw/sharp processing if needed
    const tempFilePath = path.join(process.cwd(), 'tmp', `${Date.now()}-${file.originalname}`);
    await fs.mkdir(path.dirname(tempFilePath), { recursive: true });
    await fs.writeFile(tempFilePath, file.buffer);

    try {
      // Use sharp for conversion. For RAW types, sharp can handle many via libvips; fallback may be needed.
      const webpBuffer = await sharp(tempFilePath)
        .webp({ quality: losslessFlag ? 100 : qualityValue, lossless: losslessFlag })
        .toBuffer();

      res.setHeader('Content-Type', 'image/webp');
      res.setHeader('Content-Disposition', `attachment; filename="${path.parse(file.originalname).name}.webp"`);
      res.send(webpBuffer);
    } finally {
      await fs.unlink(tempFilePath).catch(() => {});
    }
  } catch (error: any) {
    console.error('Conversion failed:', error);
    res.status(500).json({ error: 'Conversion failed. Please try again.' });
  }
});

export default router;
