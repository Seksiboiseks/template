from flask import Flask, render_template, request, flash, redirect, url_for
import os

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Change this to a random secret key

# Routes for all pages
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/products')
def products():
    return render_template('products.html')

@app.route('/reviews')
def reviews():
    return render_template('reviews.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Get form data
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        purpose = request.form.get('purpose')
        message = request.form.get('message')
        
        # Simple validation
        if not name or not email or not message:
            flash('Please fill in all required fields.', 'error')
        else:
            # In a real app, you'd save to database or send email
            flash(f'Thank you {name}! Your message has been received.', 'success')
            print(f"Contact form submitted:")
            print(f"Name: {name}")
            print(f"Email: {email}")
            print(f"Phone: {phone}")
            print(f"Purpose: {purpose}")
            print(f"Message: {message}")
            print("-" * 50)
        
        return redirect(url_for('contact'))
    
    return render_template('contact.html')

@app.route('/submit-review', methods=['POST'])
def submit_review():
    # Handle review form submission
    reviewer_name = request.form.get('reviewer-name')
    rating = request.form.get('rating')
    review_text = request.form.get('review-text')
    
    if not reviewer_name or not review_text:
        flash('Please fill in all required fields.', 'error')
    else:
        flash(f'Thank you {reviewer_name}! Your review has been submitted.', 'success')
        print(f"Review submitted:")
        print(f"Name: {reviewer_name}")
        print(f"Rating: {rating} stars")
        print(f"Review: {review_text}")
        print("-" * 50)
    
    return redirect(url_for('reviews'))

# Error handlers
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(debug=True)