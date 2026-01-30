from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome()
driver.maximize_window()

url = "http://localhost:8000"
driver.get(url)

print("URL:", driver.current_url)
print("Title:", driver.title)

time.sleep(2)

# -------- Flow A : Negative Scenario --------
driver.find_element(By.ID, "fname").send_keys("Deeraj")
driver.find_element(By.ID, "email").send_keys("test@gmail.com")
driver.find_element(By.ID, "phone").send_keys("+919876543210")

# select gender
driver.find_element(By.XPATH, "//input[@value='Male']").click()

driver.find_element(By.ID, "password").send_keys("Test123")
driver.find_element(By.ID, "confirm").send_keys("Test123")
driver.find_element(By.ID, "terms").click()

driver.find_element(By.ID, "submitBtn").click()
time.sleep(2)

driver.save_screenshot("error-state.png")

# -------- Flow B : Positive Scenario --------
driver.refresh()
time.sleep(2)

driver.find_element(By.ID, "fname").send_keys("Deeraj")
driver.find_element(By.ID, "lname").send_keys("GR")
driver.find_element(By.ID, "email").send_keys("valid@gmail.com")
driver.find_element(By.ID, "phone").send_keys("+919876543210")
driver.find_element(By.XPATH, "//input[@value='Male']").click()

driver.find_element(By.ID, "password").send_keys("Test123")
driver.find_element(By.ID, "confirm").send_keys("Test123")
driver.find_element(By.ID, "terms").click()

driver.find_element(By.ID, "submitBtn").click()
time.sleep(2)

driver.save_screenshot("success-state.png")

# -------- Flow C : Logic Validation --------
driver.refresh()
time.sleep(2)

# Country -> State -> City
driver.find_element(By.ID, "country").send_keys("India")
time.sleep(1)
driver.find_element(By.ID, "state").send_keys("Tamil Nadu")
time.sleep(1)
driver.find_element(By.ID, "city").send_keys("Chennai")

# Password strength + mismatch
driver.find_element(By.ID, "password").send_keys("weak")
driver.find_element(By.ID, "confirm").send_keys("wrong")
time.sleep(2)

print("Logic validation completed")

time.sleep(3)
driver.quit()
