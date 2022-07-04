const trashcan = document.querySelectorAll('a.delete');

trashcan.forEach(can => {
    can.addEventListener('click', (evt) => {
        let enpoint = `/notes/delete-note/${can.dataset.del}`;
    
        fetch(enpoint, { method: 'DELETE'})
        .then( res => {
            res.json()
            .then( data => {
                location.href = data.redirect;
            })
            .catch( err => {
                console.log(err);
            });
        })
        .catch( err => {
            console.log(err);
        });
    });
})