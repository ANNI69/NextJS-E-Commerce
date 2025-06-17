// Product validation schema
const productSchema = {
    name: { required: true, minLength: 3, maxLength: 100 },
    description: { required: true, minLength: 10 },
    price: { required: true, min: 0.01 },
    category_id: { required: true, format: 'uuid' },
    stock_quantity: { required: true, min: 0 }
  };
  
  function validateProduct(data: any) {
    const errors = [];
    
    for (const [field, rules] of Object.entries(productSchema)) {
      if (rules.required && !data[field]) {
        errors.push(`${field} is required`);
      }
      // Additional validation logic
    }
    
    return errors;
  }
  