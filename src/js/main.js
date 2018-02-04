document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // loop over all textareas with [data-crypto]-attribute
    // [data-crypto] specifies algorithm to use, [data-todo] specifies direction in which to crypt
    Array.from(document.querySelectorAll('textarea[data-crypto]')).forEach(ta => {
        // get data for this textaera
        let data = ta.dataset;
        // determine selector for respective target-textarea
        let targetSel = '#to-' + (data.todo === 'encrypt' ? 'decrypt-' : 'encrypt-') + data.crypto;

        // make sure crypto-method is known
        if(!window[data.crypto]) {
            console.error('crypto-method "%s" not found!', data.crypto);
            return false;
        }

        // fill attributes id and placeholder of this textarea
        ta.id = 'to-' + data.todo + '-' + data.crypto;
        ta.placeholder = data.todo + ' using ' + data.crypto;

        // attach listener for input-events that prints en-/decrypted content to target textarea
        ta.addEventListener('input', () => {
            window.requestAnimationFrame(() => {
                let targetEl = document.querySelector(targetSel);
                // abort if target textarea does not exist
                if(!targetEl) {
                    console.error('Couldn\'t find target element for this operation!\nAborting.');
                    return false;
                }
                targetEl.value = window[data.crypto][data.todo](ta.value);
            });
        });
    });
});