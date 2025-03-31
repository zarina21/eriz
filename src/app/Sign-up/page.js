export default function SignUp() {
    const {form, setform} = useState({
        Email: "",
        Password: "",
        Confirm password: "",
        Username: "",
        Name: "",
        Lastname: "",
    });

    const {error, setError} = useState({});
    const {showSuccess, setShowSuccess} = useState(false);
    const [aceptTerms, setAcceptTerms] = useState(false);