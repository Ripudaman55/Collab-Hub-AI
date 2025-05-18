# server/selenium_runner.py
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import sys

if len(sys.argv) < 2:
    print("Error: Missing search query")
    sys.exit(1)

query = sys.argv[1]
print("Starting Chrome browser...")
# driver = webdriver.Chrome("E:\Chitkara Deakin S464\DEAKIN\Trisemister 1 (2025)\SIT333 - Software and Quality Testing\1.1P Evidence Week 1 learning\chromedriver-win64\chromedriver-win64\chromedriver.exe")  # Make sure chromedriver is installed and in PATH

chromedriver_path = r"E:\Chitkara Deakin S464\DEAKIN\Trisemister 1 (2025)\SIT333 - Software and Quality Testing\1.1P Evidence Week 1 learning\chromedriver-win64\chromedriver-win64\chromedriver.exe"
chrome_binary = r"E:\Chitkara Deakin S464\DEAKIN\Trisemister 1 (2025)\SIT333 - Software and Quality Testing\1.1P Evidence Week 1 learning\chrome-win64\chrome-win64\chrome.exe"  # Optional

service = Service(executable_path=chromedriver_path)
options = webdriver.ChromeOptions()
options.binary_location = chrome_binary  # Optional: only if default Chrome not found

# Optional: run headless
# options.add_argument('--headless')
# options.add_argument('--disable-gpu')

driver = webdriver.Chrome(service=service, options=options)
print("Starting Chrome browser...")
print("Opening Dimensions...")
driver.get("https://app.dimensions.ai")

# Wait for page load
time.sleep(10)

# Log in to Dimensions
username = driver.find_element(By.NAME, "username")  # Example selector; may need update
username.send_keys("s224244874@deakin.edu.au")  # Replace with your username

next = driver.find_element(By.XPATH, '//input[@placeholder="Next"]')
next.send_keys(Keys.ENTER)
    
time.sleep(5)


password = driver.find_element(By.NAME, "")  # Example selector; may need update
password.send_keys("7901705427@Daman")  # Replace with your password

next = driver.find_element(By.XPATH, '//input[@placeholder="Next"]')
next.send_keys(Keys.ENTER)

time.sleep(5)

# Enter query
search_box = driver.find_element(By.NAME, "q")  # Example selector; may need update
search_box.send_keys(query)
search_box.send_keys(Keys.RETURN)

# Keep browser open or close after delay
time.sleep(10)
driver.quit()
