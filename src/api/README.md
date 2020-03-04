# API

## Videos

**Base URL**: `/api/videos`

### Get all videos

**URL**: `/`  
**Method**: `GET`  
**Auth**: false

### Get specific video

**URL**: `/:id`  
**URL Params**: `id=<videoID>`  
**Method**: `GET`  
**Auth**: false

### Get specific video thumbnail

**URL**: `/:id/thumbnail`  
**URL Params**: `id=<videoID>`  
**Method**: `GET`  
**Auth**: false

### Get specific video quality

**URL**: `/:id/:quality`  
**URL Params**:

- ID: `videoID`

**Method**: `GET`  
**Auth**: `Bearer <JWT Token>`

### Upload video

**URL**: `/`  
**Method**: `POST`  
**Auth**: true

**Body**:

```json
{
	"video": <file>,
	"title": <title>,
	"description": <description>
}
```
