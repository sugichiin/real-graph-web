# Overview of RealGraph
Conference name: The World Wide Web Conference 2019

Paper title: RealGraph: A Graph Engine Leveraging the Power-Law Distribution of Real-World Graphs

Abstract: As the size of real-world graphs has drastically increased in recent years, a wide variety of graph engines have been developed to deal with such big graphs efficiently. However, the majority of graph engines have been designed without considering the power-law degree distribution of real-world graphs seriously. Two problems have been observed when existing graph engines process real-world graphs: inefficient scanning of the sparse indicator and the delay in iteration progress due to uneven workload distribution. In this paper, we propose RealGraph, a single-machine based graph engine equipped with the hierarchical indicator and the block-based workload allocation. Experimental results on real-world datasets show that RealGraph significantly outperforms existing graph engines in terms of both speed and scalability.

# Requirements
 - Boost 1.61+
 - G++ 5.0+
 - Ubuntu 16.04.2+

# Structures
 - algs : RealGraph algorithm codes
 - core : RealGraph engine core components
 - data : RealGraph input & output data directory (configurable)

# Installation guide
(1) Install Boost library with basic path

(2) Unzip RealGraph-CPU.zip into the preferred directory

(3) Enter 'make all' or 'make "alg"' to compile algorithm codes (replace "alg" with like bfs, pg, wcc)

 - several define options in makefile, most of them are related input data format
 - bin: binary, weighted: edge with value, adjlist: adjacency list, addweight: insert edge value for no weighted input data
 
(4) Run the compiled executable with key-value parameters

% engine parameters
 - datapath: path to input file
 - data : raw input file name
 - file : preprocessed input file name
 - memoryuse_mb : maximum available size of main memory in megabytes
 - threads : maximum number of threads
 - iters : maximum number of iterations
 - preprocess : boolean whether input file needs to be preprocessed
 - enginerun : boolean whether graph algorithm needs to be performed

% algorithm parameters
 - root : starting node ID

% example
 - ~# ./bfs datapath ./data/ file Twitter data twitter_rv.net memoryuse_mb 4096 threads 8 root 12 enginerun 1 preprocess 1

# RealGraphWeb
We provide RealGraphWeb, a web-based graph analysis service using [RealGraph](http://realgraph.hanyang.ac.kr:20080/)
The following tutorial guide would be useful to get the overall concept of RealGraphWeb

to be worked
