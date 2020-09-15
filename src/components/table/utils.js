import { $ } from '../../core/dom';

const onMouseMove = (e, type, coords, $resizer) => {
    let value;

    if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({
            right: -delta + 'px',
        });
    } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({
            bottom: -delta + 'px',
        });
    }

    return value;
}

const onMouseUp = (type, localThis, value, $parent, colAtribute, $resizer) => {
    if (type === 'col') {
        $parent.css({
            width: value + 'px'
        });
        Array.from(localThis.$root.findAll(`[data-col="${colAtribute}"]`))
        .forEach(item => item.style.width = value + 'px');
    } else {
        $parent.css({
            height: value + 'px'
        });
        Array.from(localThis.$root.findAll(`[data-row="${colAtribute}"]`))
        .forEach(item => item.style.height = value + 'px');
    }

    $resizer.css({
        opacity: 0,
        right: 0, 
        bottom: 0,
    })

    document.onmousemove = null; // delete mousemove for speed
    document.onmouseup = null;
}

export const onMouseDown = (localThis, event) => {
    if (event.target.dataset.resize) {
        return new Promise(resolve => {
            const $resizer = $(event.target);
            const $parent = $resizer.closest('[data-type="resizable"]'); // ближайший родитель по дата-атрибуту
            const coords = $parent.getCoords(); // коорды элемента

            const type = $resizer.data.resize
            const colAtribute = $parent.data[type];

            const sideProps = type === 'col' ? 'bottom' : 'right';
            
            $resizer.css({
                opacity: 1,
                [sideProps]: '-5000px'
            })

            let value;

            document.onmousemove = e => {
                value = onMouseMove(e, type, coords, $resizer)
            }

            document.onmouseup = () => {
                onMouseUp(type, localThis, value, $parent, colAtribute, $resizer);
                resolve({ // like return 
                    value,
                    id: $parent.data[type],
                    type: type === 'col' ? type : null
                })
            }

        })
    }
}