# 🌐 Email API Web

[![Python Package](https://img.shields.io/pypi/v/emailotp.svg?color=blue)](https://pypi.org/project/emailotp/)
[![Dart Package](https://img.shields.io/pub/v/email_sender.svg)](https://pub.dev/packages/email_sender)
[![NPM Package](https://img.shields.io/npm/v/email-api-sender.svg?color=yellow)](https://www.npmjs.com/package/@afriddev/emailservice)
[![License](https://img.shields.io/github/license/afriddev/email_sender_webweb.svg?color=green)](https://github.com/afriddev/email-api-web/blob/main/LICENSE)

A minimal, modern frontend for the [Email API](https://github.com/afriddev/emailAPI), allowing developers to explore and use the service directly from the browser. It includes links to official SDKs/packages for Python, Dart, JavaScript, and Java.

> Send emails easily via API without any complicated setup – just plug and play!

---

## ✨ Features

- Clean, modern UI built with Tailwind CSS and Vite
- Integrated [Buy Me a Coffee](https://www.buymeacoffee.com/afriddev) support
- Direct access to code samples and endpoints
- Lightweight and mobile responsive
- Links to official libraries for **Python**, **Dart**, **JavaScript**, and **Java**

---

## 🚀 Live Website

👉 [Visit the Email API Web App](https://your-deployed-url.com)

---

## 📦 Official SDKs & Packages

| Language            | Package                                                                        |
| ------------------- | ------------------------------------------------------------------------------ |
| **Python**          | [emailotp (PyPI)](https://pypi.org/project/emailotp/)                          |
| **Dart**            | [email_sender (pub.dev)](https://pub.dev/packages/email_sender)                |
| **JavaScript/Node** | [email-api-sender (npm)](https://www.npmjs.com/package/@afriddev/emailservice) |
| **Java**            | Manual usage via `HttpURLConnection` or `OkHttpClient` shown below             |

---

> Built using Vite + React + Tailwind CSS

---

## ☕ Support This Project

If you like this project or it helps you, consider supporting:

<a href="https://www.buymeacoffee.com/afriddev" target="_blank">
  <img 
    src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" 
    alt="Buy Me A Coffee" 
    class="h-[60px] w-[217px]" 
  />
</a>

---

## 📄 Java Example

```java
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class SendEmail {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://freeemailapi.vercel.app/sendEmail");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            String jsonInputString = "{
" +
                    "    "fromEmail": "yourgmail@gmail.com",
" +
                    "    "passkey": "your16digitapppassword",
" +
                    "    "toEmail": "receiver@gmail.com",
" +
                    "    "title": "Test Title",
" +
                    "    "subject": "Test Subject",
" +
                    "    "body": "This is a test email from Java client."
" +
                    "}";

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            int code = conn.getResponseCode();
            System.out.println("Response code: " + code);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

---

## 📬 API Reference

Check the backend API here: [Email API GitHub](https://github.com/afriddev/emailAPI)

---

## 🧑‍💻 Author

**Shaik Afrid**  
GitHub: [@afriddev](https://github.com/afriddev)  
Website: [Shaik afrid](https://www.afrid.live)  
Email: afridayan01@example.com

---

## 📄 License

MIT License. Free for personal and commercial use.
