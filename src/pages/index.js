import ListTemplate from './list.hbs';


document.querySelector('#fill').addEventListener('click', () => {
    let data = {
        title: 'auth',
        list: [
            { name: 'first_name' },
            { name: 'something'},
        ],
        footer: 'footer'
    };
    document.querySelector('#output').innerHTML = ListTemplate(data);
});