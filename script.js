const form = document.querySelector("#userForm");
const allUsersData = [];

const resetForm = function () {
  form.classList.remove('was-validated');
  form.reset();
};

const getData = function () {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const website = document.getElementById('website').value;
  const image = document.getElementById('image').value;
  let gender;
  let skills = [];

  const genderEl = document.querySelectorAll('input[name="gender"]');
  for (const rb of genderEl) {
    if (rb.checked) {
      gender = rb.value;
      break;
    }
  }

  const skillEl = document.querySelectorAll('input[name="skill"]');
  for (const rb of skillEl) {
    if (rb.checked) {
      skills.push(rb.value);
    }
  }

  return { name, email, website, image, gender, skills };
};

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (form.checkValidity()) {
    const data = getData();
    allUsersData.push(data);
    printResult(data);
    resetForm();
  } else {
    form.classList.add('was-validated');
  }
  removeSpan();
});

function removeSpan() {
  const span = document.getElementById("span");
  if (span) {
    span.remove();
  }
}

function printResult(data) {
  const resultEl = document.getElementById('enrolled-students');
  const wrapper = document.createElement('div');
  wrapper.className = "wrapper";
  wrapper.addEventListener('click', function (e) {
    if (e.target.classList.contains('userDeleteBtn')) {
      e.currentTarget.remove();
    }
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = "&#10006;";
  deleteBtn.className = "userDeleteBtn";

  const textInfoContainer = document.createElement('div');
  textInfoContainer.className = "textInfoContainer";

  const imageContainer = document.createElement('div');
  imageContainer.className = "imageContainer";

  const imageHyperlink = document.createElement('a');
  imageHyperlink.href = data.image;
  imageHyperlink.target = "_blank";

  const name = document.createElement('p');
  name.className = "infoText userName";
  name.innerHTML = data.name;

  const gender = document.createElement('p');
  gender.className = "infoText gender";
  gender.innerHTML = data.gender;

  const email = document.createElement('p');
  email.className = "infoText email";
  email.innerHTML = data.email;

  const website = document.createElement('a');
  website.className = "infoText website";
  website.innerHTML = data.website;
  website.href = data.website;
  website.target = "_blank";

  const skills = document.createElement('p');
  skills.className = "infoText skills";
  skills.innerHTML = data.skills.join(', ');

  const userImage = document.createElement('img');
  userImage.className = "userImage";
  userImage.src = data.image;

  textInfoContainer.append(name, gender, email, website, skills);
  imageHyperlink.appendChild(userImage);
  imageContainer.appendChild(imageHyperlink);

  wrapper.append(textInfoContainer, imageContainer, deleteBtn);
  resultEl.appendChild(wrapper);
}
