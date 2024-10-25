class MacrosCalculator:
    def __init__(self, ingredients=None):
        if ingredients is None:
            ingredients = []
        self.ingredients = ingredients

    def add_ingredient(self, name, protein, carbs, fat):
        self.ingredients.append({
            'name': name,
            'protein': protein,
            'carbs': carbs,
            'fat': fat
        })

    def modify_ingredient(self, name, protein=None, carbs=None, fat=None):
        for ingredient in self.ingredients:
            if ingredient['name'] == name:
                if protein is not None:
                    ingredient['protein'] = protein
                if carbs is not None:
                    ingredient['carbs'] = carbs
                if fat is not None:
                    ingredient['fat'] = fat
                break

    def calculate_total_macros(self):
        total_protein = sum(item['protein'] for item in self.ingredients)
        total_carbs = sum(item['carbs'] for item in self.ingredients)
        total_fat = sum(item['fat'] for item in self.ingredients)
        return {
            'total_protein': total_protein,
            'total_carbs': total_carbs,
            'total_fat': total_fat
        }
