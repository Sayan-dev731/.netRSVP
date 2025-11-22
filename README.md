# .NET Overflow'25 RSVP System

A modern, clean RSVP system with Microsoft Forms integration for online and offline event registration. Built with Node.js, Express, and vanilla JavaScript.

## 🚀 Features

- **Simple Ticket Selection**: Choose between Online and In-Person attendance
- **Microsoft Forms Integration**: Seamlessly embed your Microsoft Forms for registration
- **Admin Panel**: Easy configuration management for event details and forms
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Clean Architecture**: Organized code structure with separation of concerns
- **Security**: Built-in rate limiting, CORS, and security headers
- **Real-time Configuration**: Update event details without server restart

## 📁 Project Structure

```
.netRSVP/
├── server.js              # Main server application
├── package.json           # Node.js dependencies and scripts
├── config.json            # Event configuration and settings
├── index.html             # Main landing page
├── register.html          # Registration/RSVP page
├── admin.html             # Admin configuration panel
├── email.html             # Email template (legacy)
├── google-apps-script.js  # Legacy Google Apps Script
├── styles.css             # Global styles
├── css/
│   └── register.css       # Registration page styles
└── js/
    ├── register.js        # Registration page functionality
    └── admin.js           # Admin panel functionality
```

## 🛠 Installation & Setup

### Prerequisites

- **Node.js** (version 14.0.0 or higher)
- **npm** (comes with Node.js)
- **Microsoft Forms** account for creating registration forms

### Step 1: Clone/Download the Project

```bash
# If using Git
git clone <your-repo-url>
cd .netRSVP

# Or download and extract the ZIP file
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Microsoft Forms

1. **Create Online Registration Form**:
   - Go to [Microsoft Forms](https://forms.office.com)
   - Create a new form for online attendees
   - Add fields like: Name, Email, Organization, etc.
   - Copy the form URL (it should look like: `https://forms.office.com/r/YourFormId`)

2. **Create Offline Registration Form**:
   - Create another form for in-person attendees
   - Add additional fields like: Address, Dietary preferences, etc.
   - Copy this form URL as well

### Step 4: Update Configuration

Edit `config.json` with your event details:

```json
{
  "eventName": "Your Event Name",
  "eventDate": "Your Event Date",
  "eventDescription": "Event description...",
  "onlineFormUrl": "https://forms.office.com/r/YourOnlineFormId",
  "offlineFormUrl": "https://forms.office.com/r/YourOfflineFormId",
  "maxOnlineAttendees": 0,
  "maxOfflineAttendees": 100
}
```

### Step 5: Start the Server

```bash
# For development (with auto-restart)
npm run dev

# For production
npm start
```

The server will start on `http://localhost:3000`

## 🎯 Usage

### For Attendees

1. **Visit Registration Page**: `http://localhost:3000/register`
2. **Choose Ticket Type**: Select either "Online" or "In-Person" attendance
3. **Fill Microsoft Form**: Complete the embedded registration form
4. **Receive Confirmation**: Get confirmation email from Microsoft Forms

### For Administrators

1. **Access Admin Panel**: `http://localhost:3000/admin`
2. **Update Event Details**: Modify event name, date, description
3. **Configure Forms**: Set Microsoft Forms URLs for both ticket types
4. **Test Forms**: Verify that both forms are working correctly
5. **Save Configuration**: Changes are saved automatically to `config.json`

## 🔧 Configuration Options

### Event Settings

| Setting | Description | Example |
|---------|-------------|---------|
| `eventName` | Display name of your event | ".NET Overflow'25" |
| `eventDate` | Event date/duration | "December 11-13, 2025" |
| `eventDescription` | Brief event description | "A dedicated .NET conference..." |
| `onlineFormUrl` | Microsoft Forms URL for online registration | `https://forms.office.com/r/ABC123` |
| `offlineFormUrl` | Microsoft Forms URL for in-person registration | `https://forms.office.com/r/XYZ789` |
| `maxOnlineAttendees` | Maximum online attendees (0 = unlimited) | `0` |
| `maxOfflineAttendees` | Maximum in-person attendees | `100` |
| `registrationMessage` | Success message after registration | "Thank you for registering!" |

### Server Settings

| Setting | Description | Default |
|---------|-------------|---------|
| `port` | Server port | `3000` |
| `host` | Server host | `localhost` |
| `rateLimit.windowMs` | Rate limiting window (ms) | `900000` (15 min) |
| `rateLimit.max` | Max requests per window | `100` |

## 🌐 API Endpoints

### GET `/api/config`
Returns current event configuration

### POST `/api/config`
Updates event configuration (admin only)

### GET `/api/health`
Server health check

### GET `/api/stats`
Basic server statistics

## 🎨 Customization

### Styling

- **Main styles**: Edit `css/register.css`
- **Colors**: Modify CSS custom properties in `:root`
- **Fonts**: Update font imports in HTML head sections

### Content

- **Landing page**: Modify `index.html`
- **Registration page**: Update `register.html`
- **Admin panel**: Customize `admin.html`

### Functionality

- **Registration logic**: Edit `js/register.js`
- **Admin features**: Modify `js/admin.js`
- **Server behavior**: Update `server.js`

## 🚀 Deployment

### Local Development

```bash
npm run dev
```

### Production Deployment

1. **Set environment variables**:
   ```bash
   export NODE_ENV=production
   export PORT=80
   export HOST=0.0.0.0
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

### Cloud Deployment (Examples)

**Heroku**:
```bash
# Add Procfile
echo "web: node server.js" > Procfile

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

**Vercel**:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**DigitalOcean/AWS/Azure**:
- Use PM2 for process management
- Set up reverse proxy with Nginx
- Configure SSL certificates

## 📱 Mobile Responsiveness

The system is fully responsive and works on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones
- ✅ Different screen orientations

## 🔒 Security Features

- **Rate Limiting**: Prevents abuse and spam
- **CORS Protection**: Controls cross-origin requests
- **Security Headers**: Helmet.js for security headers
- **Input Validation**: Server-side validation for all inputs
- **URL Validation**: Ensures only Microsoft Forms URLs are accepted

## 🐛 Troubleshooting

### Common Issues

**1. Server won't start**
```bash
# Check if port is in use
netstat -an | findstr :3000

# Use different port
set PORT=3001 & npm start
```

**2. Microsoft Forms not loading**
- Verify form URLs are correct
- Check if forms are published and public
- Ensure forms allow embedding

**3. Configuration not saving**
- Check file permissions on `config.json`
- Verify server has write access to directory

**4. Styles not loading**
- Clear browser cache
- Check CSS file paths
- Verify static file serving is working

### Debug Mode

Enable detailed logging:
```bash
set DEBUG=* & npm run dev
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- 📧 Email: [your-email@domain.com]
- 💬 GitHub Issues: [Create an issue](../../issues)
- 📚 Documentation: Check this README first

## 🎉 Credits

Built with ❤️ for .NET Overflow'25 at Rungta College of Engineering

### Technologies Used

- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Microsoft Forms** - Registration forms
- **Vanilla JavaScript** - Frontend functionality
- **CSS3** - Modern styling
- **HTML5** - Semantic markup

---

**Happy Coding! 🚀**