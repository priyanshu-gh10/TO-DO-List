
$(document).ready(function () {
    const form = $("#form");
    const input = $("#form-input");
    const list_el = $("#tasks");

    loadTasks();

    form.on('submit', function (e) {
        e.preventDefault();

        const task = input.val();

        if (!task) {
            alert("Write a task first !");
            return;
        }

        const task_el = $("<div>").addClass('task');

        const task_content_el = $("<div>").addClass('content');
        task_el.append(task_content_el);

        const task_input_el = $("<input>").addClass('text').attr({
            'type': 'text',
            'value': task,
            'readonly': 'readonly'
        });
        task_content_el.append(task_input_el);

        const task_actions_el = $("<div>").addClass('actions');

        const task_edit_el = $("<button>").addClass('edit').text('Edit');
        const task_delete_el = $("<button>").addClass('remove').text('Remove');

        task_actions_el.append(task_edit_el, task_delete_el);
        task_el.append(task_actions_el);
        list_el.append(task_el);

        input.val('');

        saveTasks();

        task_edit_el.on('click', function () {
            if (task_edit_el.text().toLowerCase() === "edit") {
                task_edit_el.text("Save");
                task_input_el.removeAttr("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.text("Edit");
                task_input_el.attr("readonly", "readonly");
                saveTasks();
            }
        });

        task_delete_el.on('click', function () {
            task_el.remove();
            saveTasks();
        });
    });

    function saveTasks() {
        const tasks = [];
        $(".text").each(function () {
            tasks.push($(this).val());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);

            for (let i = 0; i < tasks.length; i++) {
                const task_el = $("<div>").addClass('task');
                const task_content_el = $("<div>").addClass('content');
                task_el.append(task_content_el);

                const task_input_el = $("<input>").addClass('text').attr({
                    'type': 'text',
                    'value': tasks[i],
                    'readonly': 'readonly'
                });
                task_content_el.append(task_input_el);

                const task_actions_el = $("<div>").addClass('actions');
                const task_edit_el = $("<button>").addClass('edit').text('Edit');
                const task_delete_el = $("<button>").addClass('remove').text('Remove');

                task_actions_el.append(task_edit_el, task_delete_el);
                task_el.append(task_actions_el);
                list_el.append(task_el);

                task_edit_el.on('click', function () {
                    if (task_edit_el.text().toLowerCase() === "edit") {
                        task_edit_el.text("Save");
                        task_input_el.removeAttr("readonly");
                        task_input_el.focus();
                    } else {
                        task_edit_el.text("Edit");
                        task_input_el.attr("readonly", "readonly");
                        saveTasks();
                    }
                });

                task_delete_el.on('click', function () {
                    task_el.remove();
                    saveTasks();
                });
            }
        }
    }
});


