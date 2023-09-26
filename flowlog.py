import subprocess
import json
import argparse
import yaml
import os

def write_to_markdown(log_data):
    directory = ".coverage"
    if not os.path.exists(directory):
        os.makedirs(directory)

    yaml_header = yaml.dump(log_data, default_flow_style=False)

    markdown_content = []
    for key, value in log_data.items():
        if key == "recType" or key == "protocol":
            markdown_line = f"**{key}**: [[{value}]]"
        elif ":" in str(value):
            before_colon, after_colon = str(value).split(":", 1)
            markdown_line = f"**{key}**: [[{before_colon}]]:{after_colon}"
        else:
            markdown_line = f"**{key}**: {value}"
        
        markdown_content.append(markdown_line)

    markdown_content = "\n".join(markdown_content)

    file_name = os.path.join(directory, f"{log_data['identity']}.md")
    with open(file_name, 'w') as f:
        f.write("---\n")
        f.write(yaml_header)
        f.write("---\n")
        f.write(markdown_content)

def process_line(line, rec_type):
    if "FLOW_LOG" in line:
        log_data = json.loads(line.split("FLOW_LOG: ")[1].strip())
        if rec_type:
            if log_data["recType"] == rec_type:
                print(f"Storing log: {log_data}")
                write_to_markdown(log_data)
        else:
            print(f"Storing log: {log_data}")
            write_to_markdown(log_data)
    else:
        capital_word_match = re.search(r'\b[A-Z]+\b', line)
        if capital_word_match:
            capital_word = capital_word_match.group(0)
            file_name = os.path.join(".coverage", f"{capital_word}.txt")
            with open(file_name, 'a') as f:
                f.write(line)


def read_from_stream(pod_name, rec_type):
    command = ['kubectl', 'logs', '-f', '-c', 'flow-collector', pod_name]
    process = subprocess.Popen(command, stdout=subprocess.PIPE)
    for line in iter(process.stdout.readline, ''):
        process_line(line.decode(), rec_type)

def read_from_file(file_path, rec_type):
    with open(file_path, 'r') as f:
        for line in f:
            process_line(line, rec_type)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process logs from kubectl or a file.")
    parser.add_argument("--file", help="Path to the file containing logs.")
    parser.add_argument("--pod", help="Name of the pod to fetch logs from.")
    parser.add_argument("--rectype", help="Record type to filter by.")
    args = parser.parse_args()

    if args.file:
        read_from_file(args.file, args.rectype)
    elif args.pod:
        read_from_stream(args.pod, args.rectype)
    else:
        print("Either --file or --pod must be specified.")
