import unittest
from macros_calc import MacrosCalculator

# Custom TestResult class to print outcomes of each test case
class CustomTestResult(unittest.TestResult):

    def addSuccess(self, test):
        super().addSuccess(test)
        print(f"Test: {test._testMethodName} passed")

    def addFailure(self, test, err):
        super().addFailure(test, err)
        print(f"Test: {test._testMethodName} failed")

    def addError(self, test, err):
        super().addError(test, err)
        print(f"Test: {test._testMethodName} encountered an error")

# The test cases for MacrosCalculator
class TestMacrosCalculator(unittest.TestCase):

    def setUp(self):
        self.calculator = MacrosCalculator()

    def test_add_ingredient(self):
        self.calculator.add_ingredient('Chicken Breast', 30, 0, 5)
        self.assertEqual(len(self.calculator.ingredients), 1)
        self.assertEqual(self.calculator.ingredients[0]['name'], 'Chicken Breast')
        self.assertEqual(self.calculator.ingredients[0]['protein'], 30)


    def test_modify_ingredient(self):
        self.calculator.add_ingredient('Avocado', 2, 15, 20)
        self.calculator.modify_ingredient('Avocado', fat=18)
        self.assertEqual(self.calculator.ingredients[0]['fat'], 18)

    def test_calculate_total_macros(self):
        self.calculator.add_ingredient('Chicken Breast', 30, 0, 5)
        self.calculator.add_ingredient('Brown Rice', 5, 45, 2)
        self.calculator.add_ingredient('Avocado', 2, 15, 20)
        totals = self.calculator.calculate_total_macros()
        self.assertEqual(totals['total_protein'], 37)
        self.assertEqual(totals['total_carbs'], 60)
        self.assertEqual(totals['total_fat'], 27)

    def test_modify_nonexistent_ingredient(self):
        self.calculator.add_ingredient('Chicken Breast', 30, 0, 5)
        self.calculator.modify_ingredient('Salmon', fat=12)  # Nonexistent ingredient
        self.assertEqual(self.calculator.ingredients[0]['fat'], 5)

# Macronutrient validation functions
def validate_protein(protein):
    return isinstance(protein, (int, float)) and 10 <= protein <= 200

def validate_carbs(carbs):
    return isinstance(carbs, (int, float)) and 50 <= carbs <= 400

def validate_fat(fat):
    return isinstance(fat, (int, float)) and 20 <= fat <= 100

class TestMacrosValidation(unittest.TestCase):

    def test_valid_protein(self):
        self.assertTrue(validate_protein(100))

    def test_invalid_protein(self):
        self.assertFalse(validate_protein(300))

    def test_valid_carbs(self):
        self.assertTrue(validate_carbs(250))

    def test_invalid_carbs(self):
        self.assertFalse(validate_carbs(30))

    def test_valid_fat(self):
        self.assertTrue(validate_fat(50))

    def test_invalid_fat(self):
        self.assertFalse(validate_fat(150))

# Running the tests using the custom test runner
if __name__ == '__main__':
    # Create a test suite and add tests
    suite = unittest.TestSuite()
    suite.addTests(unittest.TestLoader().loadTestsFromTestCase(TestMacrosCalculator))
    suite.addTests(unittest.TestLoader().loadTestsFromTestCase(TestMacrosValidation))

    # Run the suite using the custom TestResult
    runner = unittest.TextTestRunner(resultclass=CustomTestResult)
    runner.run(suite)
