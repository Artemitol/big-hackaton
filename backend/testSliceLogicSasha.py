class Property:
    def __init__(self, name, prop_type, scalar_type=None):
        self.name = name
        self.prop_type = prop_type  # тип свойства: скалярный или отношение
        self.scalar_type = scalar_type  # тип скалярного свойства
        self.related_properties = []  # связанные свойства
        self.relation = None  # связь (если это отношение)

    def set_relation(self, related_property):
        if self.prop_type == "relation":
            self.related_properties.append(related_property)
            self.relation = related_property
        else:
            raise ValueError("Только свойства типа 'relation' могут иметь связанные свойства.")

class Slice:
    def __init__(self, name):
        self.name = name
        self.property_values = {}  # значения свойств для данного разреза

    def set_property_value(self, property_name, value):
        self.property_values[property_name] = value

    def get_property_value(self, property_name):
        return self.property_values.get(property_name)


class Product:
    def __init__(self, name):
        self.name = name
        self.properties = []  # свойства продукта
        self.slices = []  # разрезы продукта

    def add_property(self, property):
        self.properties.append(property)

    def add_slice(self, slice_):
        self.slices.append(slice_)

    def get_property_value(self, slice_name, property_name):
        for slice_ in self.slices:
            if slice_.name == slice_name:
                return slice_.get_property_value(property_name)
        return None


class InsuranceSystem:
    def __init__(self):
        self.products = []
        self.slices = []
        self.properties = []

    def add_product(self, product):
        self.products.append(product)

    def add_slice(self, slice_):
        self.slices.append(slice_)

    def add_property(self, property):
        self.properties.append(property)

    def get_property_meta_info(self, property_name):
        for prop in self.properties:
            if prop.name == property_name:
                return {
                    "name": prop.name,
                    "type": prop.prop_type,
                    "related_properties": [r.name for r in prop.related_properties],
                }
        return None

    def get_property_value_via_api(self, slice_name, property_name):
        for product in self.products:
            for slice_ in product.slices:
                if slice_.name == slice_name:
                    return slice_.get_property_value(property_name)
        return None


# пример использования:

system = InsuranceSystem()

# свойства
currency_property = Property("Доступные валюты", "relation")
sales_channel_property = Property("Вид канала продаж", "scalar", "string")

# добавляем свойства в систему
system.add_property(currency_property)
system.add_property(sales_channel_property)

# разрезы
office = Slice("Офис")
agent = Slice("Агенты")
online = Slice("Онлайн")
partners = Slice("Партнеры")

# задаем значения свойств для разрезов
office.set_property_value("Доступные валюты", ["RUB", "USD", "CNY"])
agent.set_property_value("Доступные валюты", ["RUB", "EUR"])
online.set_property_value("Доступные валюты", ["USD", "EUR", "GBP"])
partners.set_property_value("Доступные валюты", ["RUB", "JPY"])

# добавляем разрезы в систему
system.add_slice(office)
system.add_slice(agent)
system.add_slice(online)
system.add_slice(partners)

# создаем продукт
apartment_insurance = Product("Страхование квартиры")
apartment_insurance.add_property(currency_property)
apartment_insurance.add_property(sales_channel_property)

# добавляем продукт в систему
system.add_product(apartment_insurance)

# привязываем разрезы к продукту
apartment_insurance.add_slice(office)
apartment_insurance.add_slice(agent)
apartment_insurance.add_slice(online)
apartment_insurance.add_slice(partners)

# выводим название продукта
print("Продукт:", apartment_insurance.name)

# получаем мета-информацию о свойстве
meta_info = system.get_property_meta_info("Доступные валюты")
print("Meta Info:", meta_info)

# получаем значения для разрезов через API
print("Value for 'Офис':", system.get_property_value_via_api("Офис", "Доступные валюты"))
print("Value for 'Агенты':", system.get_property_value_via_api("Агенты", "Доступные валюты"))
print("Value for 'Онлайн':", system.get_property_value_via_api("Онлайн", "Доступные валюты"))
print("Value for 'Партнеры':", system.get_property_value_via_api("Партнеры", "Доступные валюты"))
